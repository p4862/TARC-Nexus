<?php

namespace App\Http\Requests\Project;

use App\Rules\AllowedExternalHost;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<mixed>>
     */
    public function rules(): array
    {
        return $this->projectRules();
    }

    /**
     * @return array<string, list<mixed>>
     */
    protected function projectRules(bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return [
            'category_id' => [$required, 'integer', 'exists:categories,id'],
            'title' => [$required, 'string', 'max:255'],
            'subtitle' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:255'],
            'team_name' => [$partial ? 'sometimes' : 'nullable', 'nullable', 'string', 'max:255'],
            'abstract' => [$required, 'string', 'max:10000'],
            'problem_statement' => [$required, 'string', 'max:10000'],
            'proposed_solution' => [$required, 'string', 'max:10000'],
            'objectives' => [$required, 'string', 'max:10000'],
            'target_users' => [$required, 'string', 'max:10000'],
            'expected_impact' => [$required, 'string', 'max:10000'],
            'methodology' => [$required, 'string', 'max:10000'],
            'system_architecture' => [$required, 'string', 'max:10000'],
            'github_url' => [
                $partial ? 'sometimes' : 'nullable',
                'nullable',
                'string',
                'url:http,https',
                'max:2048',
                new AllowedExternalHost(['github.com', 'www.github.com']),
            ],
            'demo_url' => [
                $partial ? 'sometimes' : 'nullable',
                'nullable',
                'string',
                'url:http,https',
                'max:2048',
            ],
            'figma_url' => [
                $partial ? 'sometimes' : 'nullable',
                'nullable',
                'string',
                'url:http,https',
                'max:2048',
                new AllowedExternalHost(['figma.com', 'www.figma.com']),
            ],
            'video_url' => [
                $partial ? 'sometimes' : 'nullable',
                'nullable',
                'string',
                'url:http,https',
                'max:2048',
                new AllowedExternalHost([
                    'youtube.com',
                    'www.youtube.com',
                    'm.youtube.com',
                    'youtu.be',
                    'vimeo.com',
                    'www.vimeo.com',
                    'player.vimeo.com',
                ]),
            ],
            'members' => [$partial ? 'sometimes' : 'present', 'array', 'max:20'],
            'members.*.student_name' => ['required', 'string', 'max:255'],
            'members.*.matric_number' => ['required', 'string', 'max:100'],
            'members.*.programme' => ['required', 'string', 'max:255'],
            'members.*.supervisor' => ['required', 'string', 'max:255'],
            'sdgs' => [$required, 'array', 'min:1', 'max:3'],
            'sdgs.*.id' => ['required', 'integer', 'distinct', 'exists:sdgs,id'],
            'sdgs.*.contribution_description' => [
                'required',
                'string',
                'max:2000',
            ],
            'technology_ids' => [
                $partial ? 'sometimes' : 'present',
                'array',
                'max:30',
            ],
            'technology_ids.*' => [
                'integer',
                'distinct',
                'exists:technologies,id',
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $normalized = [];
        $textFields = [
            'title',
            'subtitle',
            'team_name',
            'abstract',
            'problem_statement',
            'proposed_solution',
            'objectives',
            'target_users',
            'expected_impact',
            'methodology',
            'system_architecture',
            'github_url',
            'demo_url',
            'figma_url',
            'video_url',
        ];
        $nullableFields = [
            'subtitle',
            'team_name',
            'github_url',
            'demo_url',
            'figma_url',
            'video_url',
        ];

        foreach ($textFields as $field) {
            if (! $this->has($field)) {
                continue;
            }

            $value = trim((string) $this->input($field));
            $normalized[$field] = in_array($field, $nullableFields, true)
                && $value === ''
                    ? null
                    : $value;
        }

        if ($this->has('members') && is_array($this->input('members'))) {
            $normalized['members'] = collect($this->input('members'))
                ->map(function (mixed $member): mixed {
                    if (! is_array($member)) {
                        return $member;
                    }

                    foreach ([
                        'student_name',
                        'matric_number',
                        'programme',
                        'supervisor',
                    ] as $field) {
                        if (array_key_exists($field, $member)) {
                            $member[$field] = trim((string) $member[$field]);
                        }
                    }

                    return $member;
                })
                ->all();
        }

        if ($this->has('sdgs') && is_array($this->input('sdgs'))) {
            $normalized['sdgs'] = collect($this->input('sdgs'))
                ->map(function (mixed $sdg): mixed {
                    if (is_array($sdg)
                        && array_key_exists('contribution_description', $sdg)) {
                        $sdg['contribution_description'] = trim(
                            (string) $sdg['contribution_description']
                        );
                    }

                    return $sdg;
                })
                ->all();
        }

        $this->merge($normalized);
    }
}
