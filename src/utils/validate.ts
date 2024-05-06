export class Validate {
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  static username(username: string) {
    if (/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username)) {
      return true;
    }
    return false;
  }

  static Password = (val: string) => {
    return val.length >= 6;
  };

  static EventValidation = (data: any) => {
    const mess: string[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'description' && key !== 'users') {
        !data[`${key}`] && mess.push(`${key} is required!!!`);
      }
    });

    return mess;
  };
}
