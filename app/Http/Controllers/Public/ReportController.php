<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\Report as GuestReportRequest;
use App\Models\Category;
use App\Models\Incident;
use App\Models\Priority;
use App\Services\Public\GuestReportService;
use App\Services\Public\ReverseGeocodeService;
use App\Services\Tenant\OrganizationContext;
use App\Support\MockData;
use App\Support\Public\IncidentPresenter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function chooseType(): Response
    {
        return Inertia::render('Public/Report/ChooseType');
    }

    public function guestWizard(OrganizationContext $organizationContext): Response
    {
        $organization = $organizationContext->organization();

        return Inertia::render('Public/Report/GuestWizard', [
            'categories' => $organization
                ? $this->organizationCategories($organization->id)
                : MockData::categories(),
            'priorities' => $organization
                ? $this->organizationPriorities($organization->id)
                : MockData::priorities(),
        ]);
    }

    public function track(): Response
    {
        return Inertia::render('Public/Report/Track');
    }

    public function show(string $trackingNumber, OrganizationContext $organizationContext): Response
    {
        $query = Incident::query()
            ->with([
                'category',
                'priority',
                'department',
                'assignee',
                'timelineEvents.user',
                'attachments',
            ])
            ->where('tracking_number', strtoupper($trackingNumber));

        if ($organizationContext->hasOrganization()) {
            $query->where('organization_id', $organizationContext->id());
        }

        $incident = $query->firstOrFail();

        return Inertia::render('Public/Report/Show', [
            'incident' => IncidentPresenter::forTrack($incident),
            'timeline' => IncidentPresenter::timeline($incident->timelineEvents),
        ]);
    }

    public function store(
        GuestReportRequest $request,
        OrganizationContext $organizationContext,
        GuestReportService $guestReportService,
    ): RedirectResponse {
        $organization = $organizationContext->organization();
        $validated = $request->validated();
        $attachments = $request->file('attachments', []);

        $incident = $guestReportService->store($organization, $validated, $attachments);

        return redirect()
            ->route('report.guest')
            ->with('reportSubmitted', [
                'trackingNumber' => $incident->tracking_number,
                'reference' => $incident->reference,
                'email' => $incident->reporter_email,
            ]);
    }

    public function reverseGeocode(Request $request, ReverseGeocodeService $geocoder): JsonResponse
    {
        $validated = $request->validate([
            'lat' => ['required', 'numeric', 'between:-90,90'],
            'lng' => ['required', 'numeric', 'between:-180,180'],
        ]);

        $result = $geocoder->resolve(
            (float) $validated['lat'],
            (float) $validated['lng'],
        );

        if ($result === null) {
            return response()->json(['message' => 'Address not found for this location.'], 404);
        }

        return response()->json($result);
    }

    private function organizationCategories(int $organizationId): array
    {
        return Category::query()
            ->where('organization_id', $organizationId)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
            ])
            ->all();
    }

    private function organizationPriorities(int $organizationId): array
    {
        return Priority::query()
            ->where('organization_id', $organizationId)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'sla_hours', 'color'])
            ->map(fn (Priority $priority) => [
                'id' => $priority->id,
                'name' => $priority->name,
                'slaHours' => $priority->sla_hours,
                'color' => $priority->color,
            ])
            ->all();
    }
}
