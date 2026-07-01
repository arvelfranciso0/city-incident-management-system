<?php

namespace App\Http\Requests\Admin;

use App\Enums\UserRole;
use App\Support\MockData;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUser extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()?->role === UserRole::Admin;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $organizationId = auth()->user()->organization_id;
        $creatableRoles = MockData::creatableRolesFor(auth()->user()->role->value ?? UserRole::Admin->value);

        return [
            'users' => ['required', 'array', 'min:1'],
            'users.*.name' => ['required', 'string', 'max:255'],
            'users.*.email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->where('organization_id', $organizationId),
            ],
            'users.*.username' => ['required', 'string', 'max:255'],
            'users.*.password' => ['required', 'string', 'min:8'],
            'users.*.role' => ['required', Rule::in($creatableRoles)],
            'users.*.department_id' => [
                'nullable',
                'integer',
                Rule::exists('departments', 'id')->where('organization_id', $organizationId),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'users.*.name' => 'full name',
            'users.*.email' => 'email',
            'users.*.username' => 'username',
            'users.*.password' => 'password',
            'users.*.role' => 'user type',
            'users.*.department_id' => 'department',
        ];
    }

    protected function prepareForValidation(): void
    {
        $users = collect($this->input('users', []))
            ->map(function (array $user) {
                if (isset($user['email']) && is_string($user['email'])) {
                    $user['email'] = strtolower($user['email']);
                }

                return $user;
            })
            ->all();

        $this->merge(['users' => $users]);
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $users = $this->input('users', []);

            foreach ($users as $index => $userData) {
                if (($userData['role'] ?? null) === UserRole::Staff->value && empty($userData['department_id'])) {
                    $validator->errors()->add(
                        "users.{$index}.department_id",
                        'Department is required for staff users.',
                    );
                }
            }

            $emails = collect($users)
                ->pluck('email')
                ->filter()
                ->map(fn (string $email) => strtolower($email));

            foreach ($emails->duplicates()->unique() as $email) {
                $validator->errors()->add('users', "Duplicate email in batch: {$email}.");
            }

            $usernames = collect($users)
                ->pluck('username')
                ->filter()
                ->map(fn (string $username) => strtolower($username));

            foreach ($usernames->duplicates()->unique() as $username) {
                $validator->errors()->add('users', "Duplicate username in batch: {$username}.");
            }
        });
    }
}
