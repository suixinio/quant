package main

import (
	//"github.com/astaxie/beego/session"
	"github.com/xiyanxiyan10/samaritan/handler"
)

func main() {
	//beegoCf := &session.ManagerConfig{}
	//globalSessions, _ := session.NewManager("memory", beegoCf)

	//globalSessions, _ = session.NewManager("memory", `{"cookieName":"gosessionid", "enableSetCookie,omitempty": true, "gclifetime":3600, "maxLifetime": 3600, "secure": false, "cookieLifeTime": 3600, "providerConfig": ""}`)
	//go globalSessions.GC()
	handler.Server()
}
