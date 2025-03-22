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
        console.log("Push aborted.");
        process.exit(1); // Abort the push if the user selects "No"
    }

    // If the user confirms, continue with the push
    console.log("Proceeding with the push...");
}

async function main() {
    const currentBranch = execSync("git symbolic-ref --short HEAD").toString().trim();
    const remoteBranch = process.argv[2]; // Target branch specified in the push command
    console.log("to the", currentBranch, remoteBranch);

    // If you're trying to push to the main branch, prevent the push
    if (remoteBranch === "main" || currentBranch === "main") {
        const isConfirm = await confirmPush();
        if (!isConfirm) {
            console.log("You are not allowed to push to the main branch, either locally or remotely.");
            process.exit(1); // Exit without pushing
        }
    }

    console.log("Proceeding with the push...");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
