type HttpMethods = "POST" | "GET" | "PUT";
export const handleAnalytics = (options: {
  serverPath: string;
  endpoints: {
    termination: { method: HttpMethods; endpoint: string };
    inactivity: { method: HttpMethods; endpoint: string };
    register: {method: HttpMethods; endpoint: string};
  };
  app: string
}) => {
  const { endpoints, serverPath, app } = options;
  const { termination, inactivity, register } = endpoints;
  const states = {
    pageClosed: false,
  };
  if (!(window as any).analyticsMemory) {
    (window as any).analyticsMemory = { token: "", active: true, isMobile: false, app };
  }
    
  const setAnalyticState = (options:{token?:string; active?:boolean; isMobile?:boolean; app?: string})=>{
    const memory = (window as any).analyticsMemory;
      (window as any).analyticsMemory = {...memory, ...options};
      if(options.isMobile !== undefined){
        handleRegistration();
      }
  }

  const getAnalyticState = (state:"token" | "active" | "isMobile" | "app")=>{
    const memory = (window as any).analyticsMemory;
    return memory[state];
  }

  if (serverPath.endsWith("/")) {
    console.warn("serverPath should not end with /");
    return {setAnalyticState, getAnalyticState};
  };

  const handleRegistration = async()=>{
    const option = {
      method: "POST",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isMobile:getAnalyticState("isMobile"), app: getAnalyticState("app") }),
    };
    const response = await fetch(
      serverPath + register.endpoint,
      option
    );
    const { token } = await response.json();
    setAnalyticState({token})
  }
  const terminate = () => {
    if (states.pageClosed) return;
    states.pageClosed = true;
    // mobile.log("pageClosed")
    navigator.sendBeacon(
      serverPath + termination.endpoint,
      JSON.stringify({ token: getAnalyticState("token") })
    );
  };
  const handlePageTermination = async () => {
    window.addEventListener("unload", terminate);
    window.addEventListener("beforeunload", terminate);
    window.addEventListener("pagehide", terminate);
  };
  let flag = false;
  const handleActivity = () => {
    const eventHandler = async (event:"visibilitychange" | "blur" | "focus" |"pagehide" | "freeze" | "pageshow" | "resume") => {
      if(!flag){
        flag = true;
        return;
      }
      // mobile.log(event)
      const isMobile = getAnalyticState("isMobile");
      let isActive = false;
      switch (event) {
        case "visibilitychange":
          isActive = document.visibilityState === "visible";
          break;
        case "blur":
          isActive = false
          break;
        case "focus":
          isActive = true
          break;
        case "freeze":
          isActive = false
          break;
        case "pagehide":
          isActive = false
          break;
          case "pageshow":
            isActive = true
            break;
            case "resume":
          isActive = true
          break;
      }
      if(isMobile){
        if(!isActive){
          terminate();
        } else {
          await handleRegistration();
          states.pageClosed = false;
          // mobile.log("pageOpen")
        }  
      } else{
        // mobile.log("sendBeacon")
        // navigator.sendBeacon(
        //   serverPath + inactivity.endpoint,
        //   JSON.stringify({ token: getAnalyticState("token"), isActive, isMobile  })
        // );
      }
    }
    document.addEventListener("visibilitychange", () => {eventHandler("visibilitychange")});
    window.addEventListener("blur", () => {eventHandler("blur")});
    document.addEventListener("focus", () => {eventHandler("focus")});
    document.addEventListener("freeze", () => {eventHandler("freeze")});
    window.addEventListener("pagehide", () => {eventHandler("pagehide")});
    window.addEventListener("pageshow", () => eventHandler("pageshow"));
    document.addEventListener("resume", () => eventHandler("resume"));
  };
  handlePageTermination();
  handleActivity();
  return {setAnalyticState, getAnalyticState};
};