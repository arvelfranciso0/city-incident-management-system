<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->string('domain')->nullable()->after('subdomain');
        });

        $defaultDomain = env('TENANT_DEFAULT_DOMAIN', env('PLATFORM_DOMAIN', 'cims.test'));

        DB::table('organizations')
            ->whereNull('domain')
            ->whereNotNull('subdomain')
            ->update(['domain' => $defaultDomain]);

        Schema::table('organizations', function (Blueprint $table) {
            $table->dropUnique(['subdomain']);
            $table->unique(['subdomain', 'domain']);
        });
    }

    public function down(): void
    {
        Schema::table('organizations', function (Blueprint $table) {
            $table->dropUnique(['subdomain', 'domain']);
            $table->unique('subdomain');
            $table->dropColumn('domain');
        });
    }
};
