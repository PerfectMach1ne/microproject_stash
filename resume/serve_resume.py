#!/bin/python3.12

import os, socketserver
from http.server import HTTPServer, SimpleHTTPRequestHandler


print("Serving ./resume at 127.0.0.1:5500")

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address=('192.168.1.177', 5500)
    httpd = server_class(server_address, handler_class)
    # httpd = socketserver.TCPServer(server_address, SimpleHTTPRequestHandler)
    httpd.serve_forever()


os.chdir('./resume')
run()
