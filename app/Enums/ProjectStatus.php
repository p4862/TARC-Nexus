<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case Draft = 'Draft';
    case Submitted = 'Submitted';
    case UnderReview = 'Under Review';
    case Approved = 'Approved';
    case Published = 'Published';
}
