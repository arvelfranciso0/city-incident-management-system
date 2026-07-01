<?php

namespace App\Support;

use App\Models\Incident;
use Illuminate\Support\Collection;

class ChartHelper
{
    public function dashboardChartData(int $organizationId): Collection
    {
        $data = Incident::query()
            ->selectRaw("
                DATE_FORMAT(created_at, '%b') as month,
                COUNT(*) as incidents,
                COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved
            ")
            ->where('organization_id', $organizationId)
            ->groupByRaw("YEAR(created_at), MONTH(created_at), DATE_FORMAT(created_at, '%b')")
            ->orderByRaw("YEAR(created_at), MONTH(created_at)")
            ->get();
        
        return $data->mapWithKeys(function ($row) {
            return [
                $row->month => [
                    'incidents' => (int) $row->incidents,
                    'resolved' => (int) $row->resolved,
                ]
            ];
        }); 
    }
}
