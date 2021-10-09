This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Windows Setup Automation Server

This is the api server to save computer uuid / names / mac addresses etc. to automate windows setup and domain join in deployments of large scale.
Currently running in schools of the German Landkreis Würzburg, mostly on Microsoft Surface Go 2 tablet devices.

This server is one part of the deployment with a self healing windows instance. The [deployment scripts](https://github.com/scriptman-de/windows-resetstick) are located in a separate repository, because they are only batch / PowerShell scripts for a Windows PE environment.
