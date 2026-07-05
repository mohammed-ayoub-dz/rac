#include "include/webview.h"
#include <stddef.h>
#include <stdio.h>


extern unsigned char assets_index_html[];
extern unsigned int assets_index_html_len;

void Greeting(const char *seq , const char *req , void *arg){
    webview_t w = (webview_t)arg;
    printf("Received from React: %s\n", req);
    const char *response = "{\"status\":\"success\", \"message\":\"Hello !!\"}";
    webview_return(w, seq, 0, response);
}


int main(){
    #ifdef DEV
        webview_t w = webview_create(1, 0); 
    #else
        webview_t w = webview_create(0, 0);
    #endif
    
        webview_set_title(w, "My First Webview App");
        webview_set_size(w, 480, 320, WEBVIEW_HINT_NONE);
    
        webview_bind(w, "callNativeC", Greeting, w);
    
    #ifdef DEV
        webview_navigate(w, "http://localhost:5173");
    #else
    webview_set_html(w, (const char*)assets_index_html);
    #endif
    
        webview_run(w);
        webview_destroy(w);
    
        return 0;
}
