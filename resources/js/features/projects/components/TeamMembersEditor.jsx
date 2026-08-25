import { Plus, Trash2 } from "lucide-react";

import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMPTY_MEMBER = {
  student_name: "",
  matric_number: "",
  programme: "",
  supervisor: "",
};

export function TeamMembersEditor({
  members,
  onChange,
  errors,
  disabled = false,
}) {
  function updateMember(index, field, value) {
    onChange(
      members.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member
      )
    );
  }

  function removeMember(index) {
    onChange(members.filter((_, memberIndex) => memberIndex !== index));
  }

  return (
    <div className="grid gap-5">
      {members.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/40 p-5 text-sm text-muted-foreground">
          No team members added. Individual exhibitors can leave this section
          empty.
        </p>
      ) : null}

      {members.map((member, index) => (
        <fieldset
          key={`member-${index}`}
          className="grid gap-4 rounded-lg border border-border p-4"
          disabled={disabled}
        >
          <legend className="px-2 font-semibold text-foreground">
            Team member {index + 1}
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id={`member-${index}-name`}
              label="Student name"
              error={errors[`members.${index}.student_name`]?.[0]}
            >
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  value={member.student_name}
                  onChange={(event) =>
                    updateMember(index, "student_name", event.target.value)
                  }
                  required
                />
              )}
            </FormField>
            <FormField
              id={`member-${index}-matric`}
              label="Student ID"
              error={errors[`members.${index}.matric_number`]?.[0]}
            >
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  value={member.matric_number}
                  onChange={(event) =>
                    updateMember(index, "matric_number", event.target.value)
                  }
                  required
                />
              )}
            </FormField>
            <FormField
              id={`member-${index}-programme`}
              label="Programme"
              error={errors[`members.${index}.programme`]?.[0]}
            >
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  value={member.programme}
                  onChange={(event) =>
                    updateMember(index, "programme", event.target.value)
                  }
                  required
                />
              )}
            </FormField>
            <FormField
              id={`member-${index}-supervisor`}
              label="Supervisor"
              error={errors[`members.${index}.supervisor`]?.[0]}
            >
              {(fieldProps) => (
                <Input
                  {...fieldProps}
                  value={member.supervisor}
                  onChange={(event) =>
                    updateMember(index, "supervisor", event.target.value)
                  }
                  required
                />
              )}
            </FormField>
          </div>

          {!disabled ? (
            <Button
              type="button"
              variant="ghost"
              className="w-fit text-destructive"
              onClick={() => removeMember(index)}
            >
              <Trash2 aria-hidden="true" />
              Remove member
            </Button>
          ) : null}
        </fieldset>
      ))}

      {!disabled ? (
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={() => onChange([...members, { ...EMPTY_MEMBER }])}
          disabled={members.length >= 20}
        >
          <Plus aria-hidden="true" />
          Add team member
        </Button>
      ) : null}

      {errors.members?.[0] ? (
        <p className="text-sm font-medium text-destructive" role="alert">
          {errors.members[0]}
        </p>
      ) : null}
    </div>
  );
}
