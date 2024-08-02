export function get_auth_status(context) {
  var dopath = context.request.url.split("/api/write/items/")[1];
  if (context.env["GUEST"]) {
    if (dopath.startsWith("_$flaredrive$/thumbnails/")) return true;
    const allow_guest = context.env["GUEST"].split(",");
    for (var aa of allow_guest) {
      if (aa == "*") {
        return true;
      } else if (dopath.startsWith(aa)) {
        return true;
      }
    }
  }
  var headers = new Headers(context.request.headers);
  if (!headers.get("Authorization")) return false;
  const Authorization = headers.get("Authorization").split("Basic ")[1];
  const account = atob(Authorization);
  if (!account) return false;
  if (!context.env[account]) return false;
  if (dopath.startsWith("_$flaredrive$/thumbnails/")) return true;
  const allow = context.env[account].split(",");
  for (var a of allow) {
    if (a == "*") {
      return true;
    } else if (dopath.startsWith(a)) {
      return true;
    }
  }
  return false;
}

export function Res401() {
  var header = new Headers();
  var realm = btoa(encodeURIComponent("需要登录"));
  header.set("WWW-Authenticate", `Basic realm=${realm}`);
  console.log(`header:`, header);
  return new Response("没有操作权限", {
    status: 401,
    headers: header,
  });
}
export function getVisitAuth(context) {

  var headers = new Headers(context.request.headers);
  if (!headers.get("Authorization")) return false;
  const Authorization = headers.get("Authorization").split("Basic ")[1];
  const account = atob(Authorization);
  if (!account) return false;
  if (!context.env[account]) return false;

  const allow = context.env[account].split(",");
  for (var a of allow) {
    if (a == "*") {
      return true;
    }
  }
  return false;
}
