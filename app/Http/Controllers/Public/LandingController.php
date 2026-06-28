<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Support\MockData;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('Public/Home', [
            'stats' => [
                ['value' => '12', 'label' => 'Active Alerts'],
                ['value' => '2.4d', 'label' => 'Response Time'],
                ['value' => '98%', 'label' => 'Resolution'],
            ],
            'faqs' => MockData::faqs(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Public/About');
    }

    public function faqs(): Response
    {
        return Inertia::render('Public/FAQs', [
            'faqs' => MockData::faqs(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Public/Contact');
    }

    public function privacy(): Response
    {
        return Inertia::render('Public/Privacy');
    }

    public function terms(): Response
    {
        return Inertia::render('Public/Terms');
    }
}
