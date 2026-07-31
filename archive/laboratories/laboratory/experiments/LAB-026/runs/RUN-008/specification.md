# HelixCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.073693Z
**Run ID**: RUN-008
**Seed**: 1700000008

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: append_only_array
- Commit Method: quorum_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: timing

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 294ms
- Election Timeout Base: 297ms
- Election Timeout Range: 101ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_if_log_newer
- log:command_log
- log_structure:append_only_array
- commit:quorum_commit
- recovery:state_transfer
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 49
- Elections Succeeded: 40
- Election Success Rate: 81.63%
- Messages Sent: 163
- Commits: 18
- Avg Messages/Commit: 9.06
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 52
- Elections Succeeded: 43
- Election Success Rate: 82.69%
- Messages Sent: 272
- Commits: 14
- Avg Messages/Commit: 19.43
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 47
- Election Success Rate: 83.93%
- Messages Sent: 429
- Commits: 12
- Avg Messages/Commit: 35.75
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 62
- Elections Succeeded: 62
- Election Success Rate: 100.00%
- Messages Sent: 686
- Commits: 20
- Avg Messages/Commit: 34.30
- Leader Changes: 62
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

