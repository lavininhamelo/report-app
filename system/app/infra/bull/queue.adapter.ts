import Queue from "bull";

export function createQueue(queueName: string) {
  const queue = new Queue(queueName, {
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT as string),
    },
  });

  return queue;
}
