<?php

namespace App\Enums;

enum NotificationType: string
{
    case Status = 'status';
    case Assignment = 'assignment';
    case Report = 'report';
    case System = 'system';
}
