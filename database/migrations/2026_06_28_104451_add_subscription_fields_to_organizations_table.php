<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->string('subscription_plan', 32)->default('trial')->after('is_active');
            $table->string('subscription_status', 32)->default('active')->after('subscription_plan');
            $table->timestamp('subscribed_at')->nullable()->after('subscription_status');
        });
    }

    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->dropColumn(['subscription_plan', 'subscription_status', 'subscribed_at']);
        });
    }
};
