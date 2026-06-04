// this validator must validate the data must not be empty.
export let ValidateEmptyField = (fieldName, data)=>{
    if (data === ""){
        return {
            error: `${fieldName} cannot be empty`
        }
    }
    return null
}

export let ValidateAllFieldTypes = (fieldName, value)=>{
    let errorMsg = null
    if(fieldName == "email"){
        errorMsg = ValidateEmptyField(fieldName, value)
        if(errorMsg != null) return errorMsg
        if(value.includes("@")){
            errorMsg = `${fieldName} not valid`
            return errorMsg
        }
    }else if(fieldName == "name"){
        errorMsg = ValidateEmptyField(fieldName, value)
        if(errorMsg != null) return errorMsg
        //check for legth of name must be greater than 3
        if(value.length < 3){
            errorMsg = `${fieldName} must be atleast 3 characters long`
            return errorMsg
        }
    }else if (fieldName == "roll_no"){
        errorMsg = ValidateEmptyField(fieldName, value)
        if(errorMsg != null) return errorMsg
        if(isNaN(value)){
            errorMsg = `${fieldName} must be number`
            return errorMsg
        }
    }
    return null
}