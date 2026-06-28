<?php

namespace App\Enums;

enum TimelineEventType: string
{
    case Created = 'created';
    case Assigned = 'assigned';
    case Status = 'status';
    case Note = 'note';
    case Attachment = 'attachment';
    case Feedback = 'feedback';
}
