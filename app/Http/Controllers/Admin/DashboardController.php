<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\DashboardStatsService;
use App\Support\ChartHelper;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardStatsService $dashboardStats,
        private ChartHelper $chart_helper
    ) {}

    public function index(): Response
    {
        $organization = auth()->user()->organization;
        $organizationId = $organization->id;
        $organization->load([
            'departments' => fn ($query) => $query
                ->with('head:id,name')
                ->withStats(),
            'incidents' => fn ($q) => $q->latest('reported_at')->limit(5)->with('department:id,name'),
            'activityLogs' => fn ($q) => $q->latest()->limit(10),
        ]);

        $recendIncidents = $organization->incidents->map(function ($incident) {
            return [
                'id' => $incident->id,
                'title' => $incident->title,
                'description' => $incident->description,
                'category' => $incident->category,
                'priority' => $incident->priority,
                'status' => $incident->status,
                'location' => $incident->location,
                'lat' => $incident->lat,
                'lng' => $incident->lng,
                'reportedAt' => $incident->reported_at,
                'updatedAt' => $incident->updated_at,
                'assignedTo' => $incident->assigned_to,
                'department' => $incident->department?->name,
                'reporter' => $incident->reporter?->name,
                'trackingNumber' => $incident->tracking_number,
            ];
        });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $this->dashboardStats->forOrganization($organization),
            'chartData' => $this->chart_helper->dashboardChartData($organizationId),
            'recentIncidents' => $recendIncidents,
            'departments' => $organization->departments,
            'activityLogs' => $organization->activityLogs,
            'slaAlert' => $this->dashboardStats->slaBelowTargetMessage($organization),
            'slaTargetPercent' => $this->dashboardStats->slaTargetPercent(),
        ]);
    }
}
