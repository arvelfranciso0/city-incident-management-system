<?php

namespace App\Models;

use App\Enums\SubscriptionPlan;
use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'subdomain',
        'domain',
        'custom_domain',
        'custom_domain_verified_at',
        'logo_path',
        'support_email',
        'support_phone',
        'timezone',
        'locale',
        'is_active',
        'subscription_plan',
        'subscription_status',
        'subscribed_at',
        'trial_ends_at',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'subscription_plan' => SubscriptionPlan::class,
        'subscription_status' => SubscriptionStatus::class,
        'subscribed_at' => 'datetime',
        'trial_ends_at' => 'datetime',
        'custom_domain_verified_at' => 'datetime',
        'settings' => 'array',
    ];

    public function tenantHost(): ?string
    {
        if ($this->custom_domain) {
            return strtolower($this->custom_domain);
        }

        if ($this->subdomain && $this->domain) {
            return strtolower("{$this->subdomain}.{$this->domain}");
        }

        return null;
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }

    public function categories(): HasMany
    {
        return $this->hasMany(Category::class);
    }

    public function priorities(): HasMany
    {
        return $this->hasMany(Priority::class);
    }

    public function incidents(): HasMany
    {
        return $this->hasMany(Incident::class);
    }

    public function settings(): HasMany
    {
        return $this->hasMany(Setting::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(Faq::class);
    }

    public function auditLogs(): HasMany
    {
        return $this->hasMany(AuditLog::class);
    }

    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }
}
