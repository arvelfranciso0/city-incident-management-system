<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncidentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'priority' => $this->priority->name,
            'status' => $this->status,
            'location' => $this->location,
            'lat' => optional($this->lat),
            'lng' => optional($this->lng),
            'reportedAt' => $this->reportedAt,
            'updatedAt' => $this->updatedAt,
            'assignedTo' => $this->assignedTo,
            'department' => $this->department->name,
            'reporter' => $this->reporter,
            'trackingNumber' => $this->trackingNumber
        ];
    }
}
