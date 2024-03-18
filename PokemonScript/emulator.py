import paho.mqtt.client as mqtt
import win32gui 
import win32con
import win32api
from collections import defaultdict
import re
import pyautogui

#Keystroke Dictionary: Inputs are directly mapped to emulator

keyDict = defaultdict(lambda: None)

keyDict["A"] = 'a' #0x41
keyDict["B"] = 'b'#0x42 
keyDict["X"] = 'x'#0x58 
keyDict["Y"] = 'y'#0x59 
keyDict["Up"] = 't'#0x54 
keyDict["Down"] = 'g'#0x47 
keyDict["Left"] = 'f'#0x46 
keyDict["Right"] = 'h'#0x48 
keyDict["L"] = 'l'#0x4C 
keyDict["R"] = 'r'#0x52 
keyDict["Select"] = 'z'#0x5A
keyDict["Start"] = 'c'#0x43 

# #Process ID of emulator
# hwnd = 0

# #Find emulator window via regex
# def callback(n,_):
#     global hwnd
#     title = win32gui.GetWindowText(n)
#     if re.match("\[.*\] melonDS", title): 
#         hwnd = n
        
# # Enumerate all top-level windows and return the ID of the emulator
# win32gui.EnumWindows(callback, None)
# print(hwnd)
# print(win32gui.GetWindowText(hwnd))

# # Ensure the ID is a valid window
# assert win32gui.IsWindow(hwnd) == 1

#mqtt
def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc))
    client.subscribe("ece180d/pokemon/test/", qos=1)

def on_disconnect(client, userdata, rc):
    if rc != 0:
        print('Unexpected Disconnect')
    else:
        print('Expected Disconnect')

def on_message(client, userdata, message):
    msg = str(message.payload.decode())
    print(msg)
    # If Invalid keystroke
    if keyDict[msg] == None:
        return
    # Issue keystrokes to emulator
    pyautogui.press(keyDict[msg])
    # temp = win32api.PostMessage(hwnd, win32con.WM_CHAR, keyDict[msg], 0)
    print(keyDict[msg])

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1)
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.connect_async('mqtt.eclipseprojects.io')
client.loop_start()

while True:
    pass

client.loop_stop()
client.disconnect()