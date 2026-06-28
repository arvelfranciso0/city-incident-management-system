<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\DepartmentController as AdminDepartmentController;
use App\Http\Controllers\Admin\IncidentController as AdminIncidentController;
use App\Http\Controllers\Admin\MapController as AdminMapController;
use App\Http\Controllers\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Admin\SystemController as AdminSystemController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Citizen\DashboardController as CitizenDashboardController;
use App\Http\Controllers\Citizen\IncidentController as CitizenIncidentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\LandingController;
use App\Http\Controllers\Public\ReportController;
use App\Http\Controllers\Staff\DashboardController as StaffDashboardController;
use App\Http\Controllers\Staff\IncidentController as StaffIncidentController;
use App\Http\Controllers\Staff\MapController as StaffMapController;
use App\Http\Controllers\Staff\ReportController as StaffReportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Portal (Guest)
|--------------------------------------------------------------------------
*/

Route::name('public.')->group(function () {
    Route::get('/', [LandingController::class, 'home'])->name('home');
    Route::get('/about', [LandingController::class, 'about'])->name('about');
    Route::get('/faqs', [LandingController::class, 'faqs'])->name('faqs');
    Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
    Route::get('/privacy', [LandingController::class, 'privacy'])->name('privacy');
    Route::get('/terms', [LandingController::class, 'terms'])->name('terms');
});

Route::prefix('report')->name('report.')->group(function () {
    Route::get('/choose-type', [ReportController::class, 'chooseType'])->name('choose-type');
    Route::get('/guest', [ReportController::class, 'guestWizard'])->name('guest');
    Route::get('/track', [ReportController::class, 'track'])->name('track');
    Route::get('/{trackingNumber}', [ReportController::class, 'show'])->name('show');
});

/*
|--------------------------------------------------------------------------
| Citizen Portal
|--------------------------------------------------------------------------
*/

Route::prefix('citizen')->name('citizen.')->group(function () {
    Route::get('/dashboard', [CitizenDashboardController::class, 'index'])->name('dashboard');
    Route::get('/notifications', [CitizenDashboardController::class, 'notifications'])->name('notifications');
    Route::get('/profile', [CitizenDashboardController::class, 'profile'])->name('profile');
    Route::get('/settings', [CitizenDashboardController::class, 'settings'])->name('settings');

    Route::get('/incidents', [CitizenIncidentController::class, 'index'])->name('incidents.index');
    Route::get('/incidents/{id}', [CitizenIncidentController::class, 'show'])->name('incidents.show');
    Route::get('/incidents/{id}/upload', [CitizenIncidentController::class, 'uploadEvidence'])->name('incidents.upload');
    Route::get('/incidents/{id}/feedback', [CitizenIncidentController::class, 'feedback'])->name('incidents.feedback');
    Route::get('/report', [CitizenIncidentController::class, 'report'])->name('report');
});

/*
|--------------------------------------------------------------------------
| Staff Portal
|--------------------------------------------------------------------------
*/

Route::prefix('staff')->name('staff.')->group(function () {
    Route::get('/dashboard', [StaffDashboardController::class, 'index'])->name('dashboard');
    Route::get('/notifications', [StaffDashboardController::class, 'notifications'])->name('notifications');
    Route::get('/profile', [StaffDashboardController::class, 'profile'])->name('profile');
    Route::get('/settings', [StaffDashboardController::class, 'settings'])->name('settings');

    Route::get('/incidents', [StaffIncidentController::class, 'index'])->name('incidents.index');
    Route::get('/incidents/{id}', [StaffIncidentController::class, 'show'])->name('incidents.show');

    Route::get('/maps', [StaffMapController::class, 'index'])->name('maps.index');
    Route::get('/maps/heatmap', [StaffMapController::class, 'heatmap'])->name('maps.heatmap');
    Route::get('/maps/cluster', [StaffMapController::class, 'cluster'])->name('maps.cluster');

    Route::get('/reports/monthly', [StaffReportController::class, 'monthly'])->name('reports.monthly');
    Route::get('/reports/analytics', [StaffReportController::class, 'analytics'])->name('reports.analytics');
});

/*
|--------------------------------------------------------------------------
| Administrator Portal
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [AdminUserController::class, 'create'])->name('users.create');
    Route::get('/users/{id}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::get('/users/{id}', [AdminUserController::class, 'show'])->name('users.show');

    Route::get('/departments', [AdminDepartmentController::class, 'index'])->name('departments.index');
    Route::get('/departments/{id}', [AdminDepartmentController::class, 'show'])->name('departments.show');

    Route::get('/incidents/{id}', [AdminIncidentController::class, 'show'])->name('incidents.show');

    Route::get('/categories', [AdminCategoryController::class, 'index'])->name('categories.index');

    Route::get('/system/roles', [AdminSystemController::class, 'roles'])->name('system.roles');
    Route::get('/system/audit-logs', [AdminSystemController::class, 'auditLogs'])->name('system.audit-logs');
    Route::get('/system/activity-logs', [AdminSystemController::class, 'activityLogs'])->name('system.activity-logs');
    Route::get('/system/settings', [AdminSystemController::class, 'settings'])->name('system.settings');

    Route::get('/reports/analytics', [AdminReportController::class, 'analytics'])->name('reports.analytics');
    Route::get('/reports/sla', [AdminReportController::class, 'sla'])->name('reports.sla');
    Route::get('/reports/department-performance', [AdminReportController::class, 'departmentPerformance'])->name('reports.department-performance');
    Route::get('/reports/export', [AdminReportController::class, 'export'])->name('reports.export');

    Route::get('/maps/heatmap', [AdminMapController::class, 'heatmap'])->name('maps.heatmap');
});

/*
|--------------------------------------------------------------------------
| Legacy Breeze Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return redirect()->route('citizen.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
