#!/usr/bin/env bash
# Requires tlp: https://github.com/linrunner/TLP

ask_sudo() {
  if ! which "zenity" >/dev/null 2>/dev/null; then
    eval "sudo -n $1"
  else
    eval "sudo -n $1 || zenity --password | sudo -S $1"
  fi
}

getStatus() {
  TLP_STAT=$(tlp-stat -m)
  case "$TLP_STAT" in
    "AC (manual)")
      echo "ac"
      ;;
    "battery (manual)")
      echo "bat"
      ;;
    unknown*)
      echo "unk"
      ;;
    *)
      echo "auto"
      ;;
  esac
}

usage() {
  echo "Usage $0 {get (set [auto|ac|bat])}"
  exit 1
}

case "$1" in
get)
  getStatus
  ;;
set)
  case "$2" in
    auto)
      ask_sudo "tlp start"
      ;;
    bat)
      ask_sudo "tlp bat"
      ;;
    ac)
      ask_sudo "tlp ac"
      ;;
    *)
      usage
      ;;
  esac
  ;;
*)
  usage
  ;;
esac


