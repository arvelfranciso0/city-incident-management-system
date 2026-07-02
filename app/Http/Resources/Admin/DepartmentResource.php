<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\IncidentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'head' => optional($this->head)->name ?? "--",
            'staffCount' => $this->staffCount ?? "--" ,
            'openIncidents' => $this->openIncidents ?? "--",
            'avgResolutionDays' => $this->avgResolutionDays ?? "--",
            'incidents' => IncidentResource::collection($this->whenLoaded('incidents'))
        ];
    }
}
