const file = './package.json';
const data = require(file);

if (process.argv.length !== 3) {
    console.error("version is missing")
    process.exit(1);
}

const versionAsString = process.argv[2]
const currentVersionAsString = data.version

if (!currentVersionAsString) {
    console.error("something wrong happened with current version")
    process.exit(1);
}

const parseVersion = (version) => {
    const versionParts = version.split('.')

    if (versionParts.length !== 3) {
        console.error("version must be [number].[number].[number]")
        process.exit(1);
    }

    const parsedVersion = {
        major: Number(versionParts[0]),
        minor: Number(versionParts[1]),
        patch: Number(versionParts[2]),
        get asString() {
            return `${this.major}.${this.minor}.${this.patch}`
        },
        isBiggerThan: function(version2) {
            if (this.major > version2.major) {
                return true
            }

            if (this.major === version2.major) {
                if (this.minor > version2.minor) {
                    return true
                }

                if (this.minor === version2.minor && this.patch > version2.patch) {
                    return true
                }
            }

            return false
        }
    }

    if (isNaN(parsedVersion.major) || isNaN(parsedVersion.minor) || isNaN(parsedVersion.patch)) {
        console.error("version must be [number].[number].[number]")
        process.exit(1);
    }

    return parsedVersion
}

const version = parseVersion(versionAsString)
const currentVersion = parseVersion(currentVersionAsString)

console.log(`Current version ${currentVersion.asString}`)
console.log(`New version ${version.asString}`)

if (!version.isBiggerThan(currentVersion)) {
    console.error(`Your set version ${version.asString} must be bigger as current version ${currentVersion.asString}`)
    process.exit(1)
}

process.exit(0)