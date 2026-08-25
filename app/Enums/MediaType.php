<?php

namespace App\Enums;

enum MediaType: string
{
    case Image = 'image';
    case Poster = 'poster';
    case Video = 'video';
    case Document = 'document';
}
