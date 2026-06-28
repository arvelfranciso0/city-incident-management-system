<?php

namespace App\Http\Requests\Platform;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use App\Models\Organization;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrganizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $organizationId = $this->route('organization')?->id;

        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'support_email' => ['nullable', 'email', 'max:255'],
            'support_phone' => ['nullable', 'string', 'max:32'],
            'is_active' => ['sometimes', 'boolean'],
            'subscription_plan' => ['sometimes', Rule::enum(SubscriptionPlan::class)],
            'subscription_status' => ['sometimes', Rule::enum(SubscriptionStatus::class)],
            'subdomain' => ['required_with:domain', 'nullable', 'string', 'max:63', 'alpha_dash'],
            'domain' => ['required_with:subdomain', 'nullable', 'string', 'max:255', 'regex:/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i'],
            'custom_domain' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('organizations', 'custom_domain')->ignore($organizationId),
            ],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $subdomain = $this->input('subdomain');
            $domain = $this->input('domain');
            $organizationId = $this->route('organization')?->id;

            if ($subdomain && $domain && Organization::query()
                ->where('subdomain', $subdomain)
                ->where('domain', $domain)
                ->when($organizationId, fn ($query) => $query->where('id', '!=', $organizationId))
                ->exists()) {
                $validator->errors()->add('subdomain', 'This subdomain is already taken on that domain.');
            }
        });
    }
}
