<?php

namespace App\Services\Public;

use App\Enums\AttachmentType;
use App\Enums\IncidentStatus;
use App\Models\Category;
use App\Models\Incident;
use App\Models\IncidentAttachment;
use App\Models\Organization;
use App\Models\Priority;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GuestReportService
{
    /**
     * @param  array<string, mixed>  $data
     * @param  array<int, UploadedFile>  $attachments
     */
    public function store(Organization $organization, array $data, array $attachments = []): Incident
    {
        return DB::transaction(function () use ($organization, $data, $attachments) {
            $category = Category::query()
                ->where('organization_id', $organization->id)
                ->findOrFail($data['category_id']);

            $priority = Priority::query()
                ->where('organization_id', $organization->id)
                ->findOrFail($data['priority_id']);

            $trackingNumber = $this->uniqueTrackingNumber();
            $reference = $this->nextReference($organization->id);
            $reportedAt = now();
            $slaDueAt = $priority->sla_hours
                ? $reportedAt->copy()->addHours($priority->sla_hours)
                : null;

            $incident = Incident::create([
                'organization_id' => $organization->id,
                'reference' => $reference,
                'tracking_number' => $trackingNumber,
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => IncidentStatus::Open,
                'location' => $data['location'],
                'address_line' => $data['address_line'],
                'city' => $data['city'],
                'postal_code' => $data['postal_code'] ?? null,
                'lat' => $data['lat'] ?? null,
                'lng' => $data['lng'] ?? null,
                'department_id' => $category->department_id,
                'category_id' => $category->id,
                'priority_id' => $priority->id,
                'reporter_user_id' => null,
                'assigned_to_user_id' => null,
                'reporter_name' => $data['reporter_name'],
                'reporter_email' => $data['reporter_email'],
                'reporter_phone' => $data['reporter_phone'] ?? null,
                'is_guest_report' => true,
                'reported_at' => $reportedAt,
                'sla_due_at' => $slaDueAt,
            ]);

            foreach ($attachments as $file) {
                $path = $file->store("incidents/{$incident->id}", 'public');

                IncidentAttachment::create([
                    'incident_id' => $incident->id,
                    'uploaded_by_user_id' => null,
                    'type' => AttachmentType::Evidence,
                    'disk' => 'public',
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'size_bytes' => $file->getSize(),
                ]);
            }

            return $incident;
        });
    }

    private function nextReference(int $organizationId): string
    {
        $year = now()->year;
        $sequence = Incident::query()
            ->where('organization_id', $organizationId)
            ->whereYear('created_at', $year)
            ->count() + 1;

        return sprintf('INC-%d-%05d', $year, $sequence);
    }

    private function uniqueTrackingNumber(): string
    {
        do {
            $trackingNumber = 'TRK-'.strtoupper(Str::random(8));
        } while (Incident::query()->where('tracking_number', $trackingNumber)->exists());

        return $trackingNumber;
    }
}
