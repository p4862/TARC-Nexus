import { AlertCircle, Search, Trash2, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ConfirmActionDialog } from "@/components/feedback/ConfirmActionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminPageHeader } from "@/features/administration/components/AdminPageHeader";
import {
  deleteAdminUser,
  fetchAdminUsers,
  updateAdminUserRole,
} from "@/features/administration/services/administrationApi";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { PaginationControls } from "@/features/exhibition/components/PaginationControls";
import { getApiErrorMessage } from "@/utils/apiError";

const ROLES = ["Administrator", "Exhibitor", "Guest"];

export function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAdminUsers({
        page,
        search,
        role: role === "all" ? "" : role,
      });
      setUsers(response.data);
      setMeta(response.meta);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to load user accounts.")
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, role, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function handleRoleChange(user, nextRole) {
    setProcessingId(user.id);
    setError("");

    try {
      const updated = await updateAdminUserRole(user.id, nextRole);
      setUsers((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to update the user role.")
      );
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDelete(user) {
    setProcessingId(user.id);
    setError("");

    try {
      await deleteAdminUser(user.id);
      await loadUsers();
      setDeleteCandidate(null);
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Unable to delete the user account.")
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="grid gap-8">
      <AdminPageHeader
        eyebrow="Account administration"
        title="Manage users"
        description="Search registered accounts, maintain trusted roles, and remove accounts when required."
      />

      <form
        onSubmit={handleSearch}
        className="grid gap-4 rounded-xl border border-border bg-background p-4 md:grid-cols-[1fr_220px_auto]"
        aria-label="Filter user accounts"
      >
        <label className="grid gap-2 text-sm font-semibold">
          Search
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Name, email, or institution"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Role
          <Select
            value={role}
            onValueChange={(value) => {
              setRole(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              {ROLES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <Button type="submit" className="self-end">
          <Search aria-hidden="true" />
          Search
        </Button>
      </form>

      {error ? (
        <Alert variant="destructive">
          <AlertCircle aria-hidden="true" />
          <AlertTitle>User action failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {isLoading ? (
        <div
          className="rounded-xl border border-border bg-background p-8 text-center text-muted-foreground"
          role="status"
        >
          Loading users…
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-xl border border-border bg-background p-8 text-center">
          <Users
            aria-hidden="true"
            className="mx-auto size-10 text-primary"
          />
          <p className="mt-4 font-semibold">No matching accounts</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  User
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Institution
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Projects
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Role
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => {
                const isSelf = user.id === currentUser.id;

                return (
                  <tr key={user.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold">{user.name}</p>
                      <p className="mt-1 text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="px-4 py-4">{user.institution}</td>
                    <td className="px-4 py-4">{user.projects_count}</td>
                    <td className="px-4 py-4">
                      <Select
                        value={user.role}
                        onValueChange={(value) =>
                          handleRoleChange(user, value)
                        }
                        disabled={isSelf || processingId === user.id}
                      >
                        <SelectTrigger
                          className="w-44"
                          aria-label={`Role for ${user.name}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <ConfirmActionDialog
                        open={deleteCandidate?.id === user.id}
                        onOpenChange={(open) =>
                          setDeleteCandidate(open ? user : null)
                        }
                        trigger={
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={isSelf || processingId === user.id}
                          >
                            <Trash2 aria-hidden="true" />
                            Delete
                          </Button>
                        }
                        title={`Delete ${user.name}?`}
                        description="Their owned projects and related engagement will also be removed."
                        confirmLabel="Delete user"
                        isPending={processingId === user.id}
                        onConfirm={() => handleDelete(user)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <PaginationControls meta={meta} onPageChange={setPage} />
    </div>
  );
}
