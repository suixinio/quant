package handler

/**
 * @brief seesion manager
 * local val bind to handler
 * seesion val bind to session
 */


import (
	"github.com/gorilla/sessions"
	"github.com/hprose/hprose-golang/rpc"
)

var cookieStore *sessions.CookieStore = nil
var cookieName string = "cookie_name"
var sessionName string = "session_name"

type BaseHandler struct {
	store map[interface{}]interface{}
}

func (handler *BaseHandler) GetLocalVal(key interface{}) (interface{}) {
	return handler.store[key]
}

func (handler *BaseHandler) SetLocalVal(key interface{}, val interface{}) {
	handler.store[key] = val
}

func (handler *BaseHandler) GetSessonVal(ctx rpc.HTTPContext, key interface{}) (interface{}) {
	session, _ := cookieStore.Get(ctx.Request, sessionName)
	return session.Values[key]
}

func (handler *BaseHandler) SetSessionVal(ctx rpc.HTTPContext, key interface{}, val interface{}) {
	session, _ := cookieStore.Get(ctx.Request, sessionName)
	session.Values[key] = val
	session.Save(ctx.Request, ctx.Response)
}

func init() {
	cookieStore = sessions.NewCookieStore([]byte(cookieName))
}