declare module "*/package.json" {
  interface PackageJson {
    name: string
    version: string
    private?: boolean
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    scripts?: Record<string, string>
  }

  const content: PackageJson
  export default content
}