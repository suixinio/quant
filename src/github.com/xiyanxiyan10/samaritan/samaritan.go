package main

import (
	// "github.com/astaxie/beego/session"
	"github.com/xiyanxiyan10/samaritan/handler"
)

func main() {
	// cf := session.ManagerConfig{}
	// cf.CookieName = "gosessionid"
	// cf.Gclifetime = 3600

	// globalSessions, _ := session.NewManager("memory", &cf)
	// go globalSessions.GC()

	handler.Server()
}
