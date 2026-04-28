/**
 * Validated, typed access to environment variables.
 *
 * Read once on first import and crash loudly if a required value is missing.
 * Avoids scattering `process.env.X!` and `if (!process.env.X) throw` checks
 * across the codebase.
 */

type EnvSchema = {
	DATABASE_URL: string;
	RESEND_API_KEY: string;
};

function readEnv(): EnvSchema {
	const required = ["DATABASE_URL", "RESEND_API_KEY"] as const;
	const missing = required.filter((key) => !process.env[key]);

	if (missing.length > 0) {
		throw new Error(
			`Missing required environment variable(s): ${missing.join(", ")}`,
		);
	}

	return {
		DATABASE_URL: process.env.DATABASE_URL as string,
		RESEND_API_KEY: process.env.RESEND_API_KEY as string,
	};
}

export const env = readEnv();
