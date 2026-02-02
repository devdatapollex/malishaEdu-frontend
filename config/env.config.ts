import { z } from 'zod';

/**
 * Environment variables schema to ensure type safety and validation.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:5000/api/v1'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Validate process.env against the schema
const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  // Throw error only in development to prevent broken production builds
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Invalid environment variables. Check your .env.local file.');
  }
}

export const env = parsedEnv.success ? parsedEnv.data : ({} as z.infer<typeof envSchema>);

/**
 * Global application configuration object.
 */
export const siteConfig = {
  name: 'MalishaEdu',
  description: 'Education platform for students and teachers.',
  links: {
    github: 'https://github.com/malishaedu',
  },
};
