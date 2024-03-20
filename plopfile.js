module.exports = (plop) => {
  /** Constants */
  const COMPONENT_FOLDER_UI = 'src/app/components/ui'
  const COMPONENT_FOLDER_FUNCTIONAL = 'src/app/components'

  /**
   * Component generator
   */
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Which type of component would you like to create?',
        choices: ['UI', 'Functional'],
      },
      {
        type: 'input',
        name: 'name',
        message: "What's the name of your component?",
      },
    ],
    actions: (data) => {
      let actions = []

      if (data.type === 'UI') {
        folder = `${COMPONENT_FOLDER_UI}`
      } else if (data.type === 'Functional') {
        folder = `${COMPONENT_FOLDER_FUNCTIONAL}`
      }

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
