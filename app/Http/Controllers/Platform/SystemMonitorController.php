<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\AuditLog;
use App\Models\Organization;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class SystemMonitorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Platform/SystemMonitor', [
            'services' => [
                ['name' => 'Application', 'status' => 'operational', 'latency' => '42ms'],
                ['name' => 'Database', 'status' => 'operational', 'latency' => '8ms'],
                ['name' => 'Queue Worker', 'status' => 'operational', 'latency' => '—'],
                ['name' => 'Mail Service', 'status' => 'operational', 'latency' => '120ms'],
                ['name' => 'File Storage', 'status' => 'operational', 'latency' => '35ms'],
            ],
            'metrics' => [
                ['label' => 'Organizations', 'value' => (string) Organization::count()],
                ['label' => 'Total Users', 'value' => (string) User::count()],
                ['label' => 'Audit Events (24h)', 'value' => (string) AuditLog::where('created_at', '>=', now()->subDay())->count()],
                ['label' => 'Activity Events (24h)', 'value' => (string) ActivityLog::where('created_at', '>=', now()->subDay())->count()],
            ],
            'recentAuditLogs' => AuditLog::query()
                ->latest()
                ->limit(8)
                ->get()
                ->map(fn ($log) => [
                    'id' => $log->id,
                    'action' => $log->action,
                    'target' => $log->target_label ?? '—',
                    'timestamp' => $log->created_at?->toIso8601String(),
                ]),
        ]);
    }
}
