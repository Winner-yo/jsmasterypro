class RequestError extends Error {
    statusCode: number
    errors?:Record<string, string[]>
    constructor(
        statusCode: number,
        message: string,
        errors?: Record<string, string[]>
    ) {
        super(message);
        this.statusCode = statusCode
        this.name = 'RequestError'
        this.errors = errors
    }
}

class ValidationError extends RequestError {
    constructor(fieldErrors: Record<string, string[]>) {
        const message = ValidationError.formatFieldErrors(fieldErrors);
        super(400, message, fieldErrors);
        this.name = 'ValidationError';
        this.errors = fieldErrors;
    }

    static formatFieldErrors(errors: Record<string, string[]>): string {
        const formatMessages = Object.entries(errors).map(
            ([field, messages]) => {
                const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

                if (messages[0] === "Required") {
                    return `${fieldName} is required`;
                } else {
                    return `${messages.join(' and ')}`;
                }
            }
        );
        return formatMessages.join(', ');
    }
}


class NotFoundError extends RequestError {
    constructor(message: string) {
        super(404, message)
        this.name = 'NotFoundError'
    }
}

class UnauthorizedError extends RequestError {
    constructor(message: string) {
        super(401, message)
        this.name = 'UnauthorizedError'
    }
}

class ForbiddenError extends RequestError {
    constructor(message: string) {
        super(403, message)
        this.name = 'ForbiddenError'
    }
}


export { RequestError, ValidationError, NotFoundError, UnauthorizedError, ForbiddenError }