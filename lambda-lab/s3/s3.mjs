// Import the required client
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Initialize the S3 client
const s3 = new S3Client({ region: "us-east-2" });

export const handler = async () => {
    const bucketName = "cfbh-logos";

    try {
        // Use the ListObjectsV2Command to list bucket objects
        const command = new ListObjectsV2Command({ Bucket: bucketName });
        const response = await s3.send(command);

        // Construct URLs from object keys
        const imageUrls = response.Contents.map(object =>
            `https://${bucketName}.s3.amazonaws.com/${object.Key}`
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ imageUrls }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
