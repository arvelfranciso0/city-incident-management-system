<?php

namespace App\Enums;

enum ActivityLogType: string
{
    case Incident = 'incident';
    case Login = 'login';
    case Report = 'report';
    case User = 'user';
    case System = 'system';
}
