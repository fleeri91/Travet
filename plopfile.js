module.exports = (plop) => {
  /** Constants */
  const COMPONENT_FOLDER_FUNCTIONAL = 'src/components'

  /**
   * Component generator
   */
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's the name of your component?",
      },
    ],
    actions: () => {
      let actions = []

      folder = `${COMPONENT_FOLDER_FUNCTIONAL}`

      actions.push({
        type: 'add',
        path: `${folder}/{{properCase name}}/{{properCase name}}.tsx`,
        templateFile: 'plop-templates/component.hbs',
      })
      actions.push({
        type: 'add',
        path: `${folder}/{{properCase name}}/index.ts`,
        templateFile: 'plop-templates/index.hbs',
      })
      actions.push('--> Your new component was created!')
      return actions
    },
  })
}
