import { confirm } from "@inquirer/prompts";
import { execSync } from "child_process";

// Function to prompt the user for confirmation before pushing to the main branch
async function confirmPush() {
    const response = await confirm([
        {
            message: "Are you sure you want to push to the main branch?",
            default: false,
        },
    ]);

    if (!response.confirmPush) {
        process.exit(1); // Abort the push if the user selects "No"
    }
}

async function main() {
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

    // If you're trying to push to the main branch, prevent the push
    if (currentBranch === "main") {
        const isConfirm = await confirmPush();
        if (!isConfirm) {
            console.log("You are not allowed to push to the main branch, either locally or remotely.");
            process.exit(1); // Exit without pushing
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
