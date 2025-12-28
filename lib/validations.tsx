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

export const AskQuestionSchema = z.object({
    title: z
        .string()
        .min(10, { message: "Title must be at least 10 characters long", })
        .max(150, { message: "Title must be at most 150 characters long",}),
    content: z
        .string()
        .min(20, { message: "Body must be at least 20 characters long", })
        .max(5000, { message: "Body must be at most 5000 characters long", }),
    tags: z
        .array(
            z
                .string()
                .min(1, { message: "Tag is required", })
                .max(50, { message: "Tag cannot exceed 50 characters", }),
           )
        .min(1, { message: "Please select at least one tag", })
        .max(5, { message: "You can select at most five tags", }),
});