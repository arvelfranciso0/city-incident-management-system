<?php

namespace App\Services\Admin;

use App\Enums\UserStatus;
use App\Models\Organization;
use Illuminate\Support\Carbon;

class DashboardStatsService
{
    private const SLA_TARGET_PERCENT = 95;

    public function slaTargetPercent(): int
    {
        return self::SLA_TARGET_PERCENT;
    }

    /**
     * @return array<int, array{label: string, value: string, change: string}>
     */
    public function forOrganization(Organization $organization): array
    {
        $startOfMonth = Carbon::now()->startOfMonth();

        $totalIncidents = $organization->incidents()->count();
        $thisMonthIncidents = $organization->incidents()
            ->where('reported_at', '>=', $startOfMonth)
            ->count();

        $activeUsers = $organization->users()
            ->where('status', UserStatus::Active)
            ->count();

        $newUsersThisMonth = $organization->users()
            ->where('status', UserStatus::Active)
            ->where('created_at', '>=', $startOfMonth)
            ->count();

        $departmentCount = $organization->departments()->count();
        $activeDepartments = $organization->departments()
            ->where('is_active', true)
            ->count();

        $slaEligible = $organization->incidents()
            ->whereNotNull('sla_due_at')
            ->whereNotNull('resolved_at')
            ->count();

        $slaCompliant = $organization->incidents()
            ->whereNotNull('sla_due_at')
            ->whereNotNull('resolved_at')
            ->whereNull('sla_breached_at')
            ->count();

        $slaCompliance = $slaEligible > 0
            ? (int) round(($slaCompliant / $slaEligible) * 100)
            : 100;

        return [
            [
                'label' => 'Total Incidents',
                'value' => number_format($totalIncidents),
                'change' => sprintf('%+d this month', $thisMonthIncidents),
            ],
            [
                'label' => 'Active Users',
                'value' => number_format($activeUsers),
                'change' => sprintf('+%d new', $newUsersThisMonth),
            ],
            [
                'label' => 'Departments',
                'value' => (string) $departmentCount,
                'change' => $activeDepartments === $departmentCount
                    ? 'All operational'
                    : sprintf('%d of %d active', $activeDepartments, $departmentCount),
            ],
            [
                'label' => 'SLA Compliance',
                'value' => $slaCompliance.'%',
                'change' => 'Target: '.self::SLA_TARGET_PERCENT.'%',
            ],
        ];
    }

    /**
     * Department names with SLA compliance below target for incidents resolved this month.
     *
     * @return array<int, string>
     */
    public function departmentsBelowSlaThisMonth(Organization $organization): array
    {
        $startOfMonth = Carbon::now()->startOfMonth();

        return $organization->departments()
            ->whereIn('departments.id', function ($query) use ($organization, $startOfMonth) {
                $query->select('department_id')
                    ->from('incidents')
                    ->where('organization_id', $organization->id)
                    ->whereNotNull('department_id')
                    ->whereNotNull('sla_due_at')
                    ->whereNotNull('resolved_at')
                    ->where('resolved_at', '>=', $startOfMonth)
                    ->groupBy('department_id')
                    ->havingRaw(
                        '(SUM(CASE WHEN sla_breached_at IS NULL THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) < ?',
                        [self::SLA_TARGET_PERCENT]
                    );
            })
            ->orderBy('name')
            ->pluck('name')
            ->all();
    }

    public function slaBelowTargetMessage(Organization $organization): ?string
    {
        $departmentNames = $this->departmentsBelowSlaThisMonth($organization);

        if ($departmentNames === []) {
            return null;
        }

        $verb = count($departmentNames) === 1 ? 'is' : 'are';

        return sprintf(
            '%s %s trending below SLA this month.',
            $this->formatDepartmentList($departmentNames),
            $verb
        );
    }

    /**
     * @param  array<int, string>  $names
     */
    private function formatDepartmentList(array $names): string
    {
        if (count($names) === 1) {
            return $names[0];
        }

        if (count($names) === 2) {
            return $names[0].' and '.$names[1];
        }

        $last = array_pop($names);

        return implode(', ', $names).', and '.$last;
    }
}
