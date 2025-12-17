import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }).max(32, {
        message: "Password must be at most 32 characters long",
    }),
});

export const signUpSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters long",
    }).max(32, {
        message: "Username must be at most 32 characters long",
    }).regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username must contain only letters, numbers, and underscores",
    }),

    email: z.string().email({
        message: "Please enter a valid email address",
    }),

    name: z.string().min(3, {
        message: "Name must be at least 3 characters long",
    }).max(32, {
        message: "Name must be at most 32 characters long",
    }).regex(/^[a-zA-Z ]+$/, {
        message: "Name must contain only letters and spaces",
    }),

    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }).max(32, {
        message: "Password must be at most 32 characters long",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});