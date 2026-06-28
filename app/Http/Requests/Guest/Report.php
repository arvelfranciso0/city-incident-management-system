<?php

namespace App\Http\Requests\Guest;

use App\Services\Tenant\OrganizationContext;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class Report extends FormRequest
{
    public function authorize(): bool
    {
        return $this->tenant()->hasOrganization();
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $organizationId = $this->tenant()->id();

        return [
            // Incident details
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'category_id' => [
                'required',
                'integer',
                Rule::exists('categories', 'id')->where(
                    fn ($query) => $query
                        ->where('organization_id', $organizationId)
                        ->where('is_active', true)
                ),
            ],
            'priority_id' => [
                'required',
                'integer',
                Rule::exists('priorities', 'id')->where(
                    fn ($query) => $query
                        ->where('organization_id', $organizationId)
                        ->where('is_active', true)
                ),
            ],

            // Location
            'location' => ['nullable', 'string', 'max:255'],
            'address_line' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:16'],
            'lat' => ['nullable', 'numeric', 'between:-90,90'],
            'lng' => ['nullable', 'numeric', 'between:-180,180'],

            // Guest reporter contact
            'reporter_name' => ['required', 'string', 'max:255'],
            'reporter_email' => ['required', 'email', 'max:255'],
            'reporter_phone' => ['nullable', 'string', 'max:32'],

            // Evidence uploads
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => [
                'file',
                'max:10240',
                'mimes:jpg,jpeg,png,pdf,webp',
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'category_id' => 'category',
            'priority_id' => 'priority',
            'address_line' => 'street address',
            'postal_code' => 'ZIP code',
            'reporter_name' => 'full name',
            'reporter_email' => 'email',
            'reporter_phone' => 'phone',
            'attachments.*' => 'attachment',
        ];
    }

    protected function prepareForValidation(): void
    {
        $location = $this->input('location');

        if (! is_string($location) || trim($location) === '') {
            $location = collect([
                $this->input('address_line'),
                $this->input('city'),
                $this->input('postal_code'),
            ])
                ->filter(fn ($part) => is_string($part) && trim($part) !== '')
                ->implode(', ');
        }

        $this->merge([
            'location' => $location,
            'category_id' => $this->input('category_id') !== null && $this->input('category_id') !== ''
                ? (int) $this->input('category_id')
                : null,
            'priority_id' => $this->input('priority_id') !== null && $this->input('priority_id') !== ''
                ? (int) $this->input('priority_id')
                : null,
            'lat' => $this->filled('lat') ? $this->input('lat') : null,
            'lng' => $this->filled('lng') ? $this->input('lng') : null,
        ]);
    }

    private function tenant(): OrganizationContext
    {
        return app(OrganizationContext::class);
    }
}
