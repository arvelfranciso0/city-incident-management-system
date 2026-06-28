<?php

namespace App\Http\Requests\Platform;

use App\Enums\SubscriptionPlan;
use App\Models\Organization;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreOrganizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'alpha_dash', 'unique:organizations,slug'],
            'subdomain' => ['required_with:domain', 'nullable', 'string', 'max:63', 'alpha_dash'],
            'domain' => ['required_with:subdomain', 'nullable', 'string', 'max:255', 'regex:/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i'],
            'support_email' => ['nullable', 'email', 'max:255'],
            'support_phone' => ['nullable', 'string', 'max:32'],
            'subscription_plan' => ['required', Rule::enum(SubscriptionPlan::class)],
            'admin_name' => ['required', 'string', 'max:255'],
            'admin_email' => ['required', 'email', 'max:255'],
            'admin_password' => ['required', 'confirmed', Password::defaults()],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $subdomain = $this->input('subdomain');
            $domain = $this->input('domain');

            if ($subdomain && $domain && Organization::query()
                ->where('subdomain', $subdomain)
                ->where('domain', $domain)
                ->exists()) {
                $validator->errors()->add('subdomain', 'This subdomain is already taken on that domain.');
            }
        });
    }
}
