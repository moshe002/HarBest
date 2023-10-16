// type ActionType = {
//     type: string;
//     inputType: string;
//     passwordChecker: boolean;
// }

// type StateType = {
//     inputType: string;
//     passwordChecker: boolean;
// }

const defaultState = {
  inputType: 'password',
  passwordChecker: false,
  changeColor: '',
  passwordText: '',
}
  
// state is the default value and the action is the updated value (im not sure)
const reducer = (state: any, action: any) => { 
    switch(action.type){
      case 'changed_type': {
        return {
            inputType: action.inputType === 'password' ? 'text' : 'password',
            passwordChecker: state.passwordChecker,
            changeColor: state.changeColor,
            passwordText: state.passwordText
        }
      }
      case 'password_checker': {
        return {
            inputType: state.inputType,
            passwordChecker: action.passwordChecker,
            changeColor: state.changeColor,
            passwordText: state.passwordText
        }
      }
      case 'change_text_color': {
        return {
          inputType: state.inputType,
          passwordChecker: state.passwordChecker,
          changeColor: action.changeColor,
          passwordText: state.passwordText
        }
      }
      case 'change_password_text': {
        return {
          inputType: state.inputType,
          passwordChecker: state.passwordChecker,
          changeColor: state.changeColor,
          passwordText: action.passwordText
        }
      }
      default:
        throw Error('Unknown action: ' + action.type)
    }
  }

export { reducer, defaultState }