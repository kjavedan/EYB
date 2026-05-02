"use client";

import { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { type LoginState, login } from "./actions";

export function LoginForm() {
	const [state, formAction, isPending] = useActionState<LoginState, FormData>(
		login,
		null,
	);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="username">Username</Label>
				<Input
					id="username"
					name="username"
					type="text"
					autoComplete="username"
					defaultValue="admin"
					required
				/>
			</div>

			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
				/>
			</div>

			{state?.error && (
				<p className="text-sm text-red-500" role="alert">
					{state.error}
				</p>
			)}

			<button
				type="submit"
				disabled={isPending}
				className="mt-2 h-10 w-full rounded-xl font-medium bg-[--button-bg] text-[--button-text] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isPending ? "Signing in…" : "Sign in"}
			</button>
		</form>
	);
}
