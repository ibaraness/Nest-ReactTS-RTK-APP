export const ExecutionTime = () => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const className = target.constructor.name;
            const methodName = key;
            const start = Date.now();

            try {
                const result = await originalMethod.apply(this, args);
                const end = Date.now();
                const duration = end - start;
                console.log(`[${className}] ${methodName} executed in ${duration}ms`);

                return result;
            } catch (error) {
                const end = Date.now();
                const duration = end - start;
                console.error(`[${className}] ${methodName} failed in ${duration}ms`, error);
                throw error;
            }
        };

        return descriptor;
    };
};