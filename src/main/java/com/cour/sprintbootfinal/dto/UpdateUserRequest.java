package com.cour.sprintbootfinal.dto;

import java.util.Set;

public class UpdateUserRequest {

    private String username;
    private String email;
    private Set<String> roles;
    private Boolean enabled;

    public UpdateUserRequest() {}

    public UpdateUserRequest(String username, String email, Set<String> roles, Boolean enabled) {
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.enabled = enabled;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
